'use client';

import { useRef, useState } from 'react';
import { ChevronIcon } from './icons';
import styles from './SortSelect.module.css';

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularité' },
  { value: 'date', label: 'Date' },
  { value: 'title', label: 'Titre' },
];

/**
 * Menu déroulant personnalisé (le <select> natif ne peut pas être stylé comme la maquette).
 * Il suit le motif ARIA « listbox » : un bouton qui ouvre une liste d'options, où
 * le focus reste sur la liste et aria-activedescendant indique l'option active.
 *
 * Clavier : Entrée/Espace/Flèche bas ouvrent la liste ; Flèches haut/bas changent
 * l'option active ; Entrée/Espace la choisissent ; Échap et Tab referment la liste.
 */
export default function SortSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRef = useRef(null);

  const selectedOption = SORT_OPTIONS.find((option) => option.value === value);
  // Comme sur la maquette, la liste ne contient que les options non sélectionnées
  const otherOptions = SORT_OPTIONS.filter((option) => option.value !== value);

  function openList() {
    setActiveIndex(0);
    setIsOpen(true);
  }

  function closeList({ returnFocus }) {
    setIsOpen(false);
    if (returnFocus) buttonRef.current.focus();
  }

  function selectOption(option) {
    onChange(option.value);
    closeList({ returnFocus: true });
  }

  function handleButtonKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // évite le défilement de la page
      openList();
    }
  }

  function handleListKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, otherOptions.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(otherOptions.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(otherOptions[activeIndex]);
        break;
      case 'Escape':
        event.preventDefault();
        closeList({ returnFocus: true });
        break;
      case 'Tab':
        // On laisse le focus avancer normalement, en refermant simplement la liste
        closeList({ returnFocus: false });
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <span id="sort-label" className={styles.label}>
        Trier par
      </span>
      <div className={styles.dropdown}>
        <button
          ref={buttonRef}
          id="sort-button"
          type="button"
          className={styles.button}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          // La liste n'existe dans le DOM que lorsqu'elle est ouverte
          aria-controls={isOpen ? 'sort-listbox' : undefined}
          // Le nom lu sera « Trier par Popularité »
          aria-labelledby="sort-label sort-button"
          onClick={() => (isOpen ? closeList({ returnFocus: false }) : openList())}
          onKeyDown={handleButtonKeyDown}
        >
          {selectedOption.label}
          <ChevronIcon direction={isOpen ? 'up' : 'down'} />
        </button>
        {isOpen && (
          <ul
            id="sort-listbox"
            role="listbox"
            className={styles.list}
            aria-labelledby="sort-label"
            aria-activedescendant={`sort-option-${otherOptions[activeIndex].value}`}
            tabIndex={-1}
            // Donne le focus à la liste dès son affichage
            ref={(list) => list?.focus()}
            onKeyDown={handleListKeyDown}
            // Referme la liste si le focus part ailleurs (clic en dehors, par exemple)
            onBlur={() => closeList({ returnFocus: false })}
          >
            {otherOptions.map((option, index) => (
              <li
                key={option.value}
                id={`sort-option-${option.value}`}
                role="option"
                aria-selected={false}
                className={index === activeIndex ? `${styles.option} ${styles.active}` : styles.option}
                // mousedown arrive avant le blur : on l'annule pour que le clic soit pris en compte
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
