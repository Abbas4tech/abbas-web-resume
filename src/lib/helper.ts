import { Entry, EntrySkeletonType } from "contentful";

export const convertEntry = <T extends EntrySkeletonType>(
  entry: Entry<T>
): T => {
  const result = { ...entry.fields } as T;
  for (const key in result) {
    const value = result[key];

    if (value && typeof value === "object" && value !== null) {
      if ("sys" in value) {
        result[key] = convertEntry(value as unknown as Entry<any>);
      } else if (Array.isArray(value)) {
        result[key] = value.map((item) => {
          if (item && typeof item === "object" && "sys" in item) {
            return convertEntry(item as unknown as Entry<any>);
          } else if (Array.isArray(item)) {
            return item.map((subItem) => {
              if (subItem && typeof subItem === "object" && "sys" in subItem) {
                return convertEntry(subItem as unknown as Entry<any>);
              }
              return subItem;
            });
          }
          return item;
        }) as any;
      }
    }
  }

  return result;
};
