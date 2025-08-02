// Динамическая загрузка toast для оптимизации bundle size
let toastLoaded = false;
let toast: any = null;

const loadToast = async () => {
  if (!toastLoaded) {
    const toastModule = await import("react-hot-toast");
    toast = toastModule.toast;
    toastLoaded = true;

    // Динамически монтируем Toaster если его еще нет
    if (
      typeof window !== "undefined" &&
      !document.getElementById("toast-root")
    ) {
      const toasterElement = document.createElement("div");
      toasterElement.id = "toast-root";
      document.body.appendChild(toasterElement);

      // Импортируем React и создаем Toaster
      Promise.all([
        import("react"),
        import("react-dom/client"),
        import("react-hot-toast"),
      ]).then(([React, ReactDOM, { Toaster }]) => {
        const root = ReactDOM.createRoot(toasterElement);
        root.render(
          React.createElement(Toaster, {
            position: "top-center",
            toastOptions: {
              style: {
                background: "rgba(13, 14, 17, 0.92)",
                padding: "20px 30px",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: "600",
              },
              success: {
                style: {
                  color: "#72E292",
                },
              },
              error: {
                style: {
                  color: "#d6405e",
                },
              },
            },
          })
        );
      });
    }
  }
  return toast;
};

export const toastError = async (message: string) => {
  const toastInstance = await loadToast();
  toastInstance.error(message);
};

export const toastSuccess = async (message: string) => {
  const toastInstance = await loadToast();
  toastInstance.success(message);
};

export const toastLoading = async (message: string) => {
  const toastInstance = await loadToast();
  return toastInstance.loading(message);
};

export const toastDismiss = async (toastId: string) => {
  const toastInstance = await loadToast();
  toastInstance.dismiss(toastId);
};
