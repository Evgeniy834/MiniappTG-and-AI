export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        platform?: string;
        ready(): void;
        expand(): void;
        close(): void;
        initData?: string;
        initDataUnsafe?: {
          user?: {
            id: number;
            username?: string;
            first_name?: string;
            last_name?: string;
            language_code?: string;
          };
        };
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        colorScheme?: 'light' | 'dark';
        isExpanded?: boolean;
        viewportHeight?: number;
        viewportStableHeight?: number;
        headerColor?: string;
        backgroundColor?: string;
        bottomBarColor?: string;
        setHeaderColor(color: string): void;
        setBackgroundColor(color: string): void;
        setBottomBarColor(color: string): void;
        onEvent(eventType: string, callback: () => void): void;
        offEvent(eventType: string, callback: () => void): void;
        sendData(data: string): void;
        switchInlineQuery(query: string, chooseChatTypes?: string[]): void;
        openLink(url: string): void;
        openTelegramLink(url: string): void;
        openInvoice(url: string): void;
        showPopup(params: {
          title?: string;
          message: string;
          buttons?: Array<{ id?: string; type?: string; text?: string }>;
        }): void;
        showAlert(message: string): void;
        showConfirm(message: string): void;
      };
    };
  }
}