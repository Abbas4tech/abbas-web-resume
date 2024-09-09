import { useState, useEffect } from "react";
import { IconType } from "react-icons";

/**
 * Custom hook to dynamically load and return a React icon component based on the iconKey.
 * @param {string} iconKey - The key/name of the icon to be loaded (e.g., 'FaBeer', 'MdHome').
 * @returns {IconType | null} The dynamically loaded icon component or null if there's an error.
 */
const useDynamicIcon = (iconKey: string) => {
  const [IconComponent, setIconComponent] = useState<IconType | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const libraryPrefix = iconKey.substring(0, 2).toLowerCase(); // Get the library prefix (e.g., 'fa' for FontAwesome, 'md' for Material Icons)

        // Dynamically import the icon library based on the prefix
        const iconLibrary = await import(`react-icons/fa`);

        // Access the named export (icon) from the dynamically imported library
        const ImportedIcon = iconLibrary[
          iconKey as keyof typeof iconLibrary
        ] as IconType;

        if (ImportedIcon) {
          setIconComponent(() => ImportedIcon);
        } else {
          console.error(`Icon ${iconKey} not found in the library`);
          setIconComponent(null);
        }
      } catch (error) {
        console.error(`Error loading icon: ${iconKey}`, error);
        setIconComponent(null); // Handle error case by setting null
      }
    };

    if (iconKey) {
      loadIcon(); // Call the load function if iconKey is provided
    }
  }, [iconKey]); // Re-run effect if iconKey changes

  return IconComponent; // Return the dynamically loaded component (or null)
};

export default useDynamicIcon;
