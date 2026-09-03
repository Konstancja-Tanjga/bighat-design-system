import './AiChat.css';
export type AiChatTemplateProps = {
    /** Which of the three data states the working area is in. */
    state?: 'ready' | 'loading' | 'error';
    /** Hides the explainer card — it is dismissible and should stay dismissed. */
    showExplainer?: boolean;
};
export declare function AiChatTemplate({ state, showExplainer }: AiChatTemplateProps): import("react").JSX.Element;
//# sourceMappingURL=AiChat.d.ts.map