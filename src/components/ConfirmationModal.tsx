import { AlertTriangle } from "lucide-react";

type Props = {
    open: boolean;
    title: string;
    description: string;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ConfirmationModal({
    open,
    title,
    description,
    onClose,
    onConfirm,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            <div className="glass-card w-full max-w-sm p-6 relative z-10 animate-in zoom-in-95 duration-200 rounded-xl border-l-4 border-l-amber-500">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-amber-500/20"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
