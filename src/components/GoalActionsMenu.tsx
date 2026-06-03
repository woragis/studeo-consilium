import { useEffect, useRef, useState } from 'react';

interface GoalActionsMenuProps {
  goalTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function GoalActionsMenu({ goalTitle, onEdit, onDelete }: GoalActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="goal-actions-menu" ref={rootRef}>
      <button
        type="button"
        className="goal-list__edit"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Opções da meta ${goalTitle}`}
      >
        ⋯
      </button>
      {open && (
        <ul className="goal-actions-menu__dropdown" role="menu">
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="goal-actions-menu__item"
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
            >
              Editar
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="goal-actions-menu__item goal-actions-menu__item--danger"
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
            >
              Excluir
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
