import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import InquiryForm from "@/components/shared/InquiryForm";
export default function InquiryDialog({ isOpen, onClose, product }) {
  const ref = useRef(null);
  const { t } = useLanguage();
  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      className="inquiry-dialog"
      aria-labelledby="inquiry-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
      data-testid="product-inquiry-modal"
    >
      <div className="dialog-heading">
        <div>
          <p className="eyebrow">{product?.name}</p>
          <h2 id="inquiry-title">{t.contact.dialogTitle}</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label={t.ui.close}
          autoFocus
        >
          <X size={22} />
        </button>
      </div>
      <p>{t.contact.dialogIntro}</p>
      {isOpen && <InquiryForm key={product?.id} product={product} />}
    </dialog>
  );
}
