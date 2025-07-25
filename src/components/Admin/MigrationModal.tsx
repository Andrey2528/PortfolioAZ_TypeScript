import React, { useState } from 'react';
import { migratePortfolioIds } from '../../utils/migrateIds';

interface MigrationStep {
    id: string;
    status: 'pending' | 'processing' | 'success' | 'error';
    message: string;
    details?: string;
}

interface MigrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: () => void;
}

const MigrationModal: React.FC<MigrationModalProps> = ({
    isOpen,
    onClose,
    onComplete,
}) => {
    const [isRunning, setIsRunning] = useState(false);
    const [steps, setSteps] = useState<MigrationStep[]>([]);
    const [finalResult, setFinalResult] = useState<{
        success: boolean;
        message?: string;
        error?: string;
    } | null>(null);

    const addStep = (step: Omit<MigrationStep, 'id'>) => {
        const newStep: MigrationStep = {
            ...step,
            id: Date.now().toString(),
        };
        setSteps((prev) => [...prev, newStep]);
    };

    const updateLastStep = (updates: Partial<MigrationStep>) => {
        setSteps((prev) => {
            const newSteps = [...prev];
            if (newSteps.length > 0) {
                newSteps[newSteps.length - 1] = {
                    ...newSteps[newSteps.length - 1],
                    ...updates,
                };
            }
            return newSteps;
        });
    };

    const runMigration = async () => {
        setIsRunning(true);
        setSteps([]);
        setFinalResult(null);

        try {
            addStep({
                status: 'processing',
                message: 'Початок міграції ID портфоліо...',
            });

            const result = await migratePortfolioIds({
                onProgress: (message: string, details?: string) => {
                    addStep({
                        status: 'processing',
                        message,
                        details,
                    });
                },
                onStepComplete: (message: string, details?: string) => {
                    updateLastStep({
                        status: 'success',
                        message,
                        details,
                    });
                },
                onError: (message: string, details?: string) => {
                    updateLastStep({
                        status: 'error',
                        message,
                        details,
                    });
                },
            });

            setFinalResult(result);

            if (result.success) {
                addStep({
                    status: 'success',
                    message: '✅ Міграція завершена успішно!',
                    details: result.message,
                });
            } else {
                addStep({
                    status: 'error',
                    message: '❌ Помилка міграції',
                    details: result.error,
                });
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Невідома помилка';
            addStep({
                status: 'error',
                message: '❌ Критична помилка',
                details: errorMessage,
            });
            setFinalResult({
                success: false,
                message: errorMessage,
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleClose = () => {
        if (finalResult?.success) {
            onComplete();
        }
        onClose();
    };

    const getStepIcon = (status: MigrationStep['status']) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'processing':
                return '🔄';
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            default:
                return '📄';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="migration-modal-overlay">
            <div className="migration-modal">
                <div className="migration-header">
                    <h2>🔄 Міграція ID проектів</h2>
                    <p>Перетворення існуючих ID на числові (1, 2, 3...)</p>
                </div>

                <div className="migration-content">
                    {steps.length === 0 && !isRunning && (
                        <div className="migration-info">
                            <div className="info-block">
                                <h3>📋 Що робить міграція:</h3>
                                <ul>
                                    <li>Знаходить всі існуючі проекти</li>
                                    <li>
                                        Сортує їх за роком (новіші спочатку)
                                    </li>
                                    <li>Присвоює числові ID (1, 2, 3...)</li>
                                    <li>Оновлює документи в базі даних</li>
                                    <li>
                                        Видаляє старі документи зі складними ID
                                    </li>
                                </ul>
                            </div>

                            <div className="warning-block">
                                <h3>⚠️ Увага:</h3>
                                <p>
                                    Ця операція незворотна. Всі існуючі ID
                                    будуть замінені на числові.
                                </p>
                            </div>
                        </div>
                    )}

                    {steps.length > 0 && (
                        <div className="migration-steps">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`migration-step ${step.status}`}
                                >
                                    <div className="step-header">
                                        <span className="step-icon">
                                            {getStepIcon(step.status)}
                                        </span>
                                        <span className="step-message">
                                            {step.message}
                                        </span>
                                    </div>
                                    {step.details && (
                                        <div className="step-details">
                                            {step.details}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {finalResult && (
                        <div
                            className={`migration-result ${finalResult.success ? 'success' : 'error'}`}
                        >
                            <h3>
                                {finalResult.success
                                    ? '🎉 Успіх!'
                                    : '💥 Помилка!'}
                            </h3>
                            <p>
                                {finalResult.message ||
                                    finalResult.error ||
                                    'Невідомий результат'}
                            </p>
                        </div>
                    )}
                </div>

                <div className="migration-actions">
                    {!isRunning && !finalResult && (
                        <>
                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Скасувати
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={runMigration}
                            >
                                🚀 Почати міграцію
                            </button>
                        </>
                    )}

                    {isRunning && (
                        <div className="migration-progress">
                            <div className="spinner"></div>
                            <span>Виконується міграція...</span>
                        </div>
                    )}

                    {finalResult && (
                        <button
                            className="btn btn-primary"
                            onClick={handleClose}
                        >
                            {finalResult.success ? '✅ Готово' : '❌ Закрити'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MigrationModal;
