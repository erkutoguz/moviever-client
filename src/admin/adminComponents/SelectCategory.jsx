/* eslint-disable react/prop-types */
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAppContext } from "../../context/appContext";
import { capitalizeText } from "../../utils/textFormatter";

const SelectCategory = ({ setCategory }) => {
  const { categories } = useAppContext();

  return (
    <Autocomplete
      label="Category"
      placeholder="Search a category"
      className="max-w-xs py-2 mt-4 mb-8 pl-2"
      defaultItems={[...[{ categoryType: "ALL" }, ...categories]]}
      size="sm"
      onSelectionChange={setCategory}
    >
      {(item) => (
        <AutocompleteItem key={item.categoryType} className="text-textColor">
          {capitalizeText(item.categoryType)}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default SelectCategory;
