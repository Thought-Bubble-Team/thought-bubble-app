import { YStack } from "tamagui";
import React from "react";

import { ListProps } from "@/utils/interfaces/componentPropTypes";

const List = (props: ListProps) => {
  const { items } = props;
  return (
    <YStack
      width="100%"
      backgroundColor="$grey1"
      borderRadius={12}
      alignItems="center"
      animation="fast"
      enterStyle={{
        opacity: 0.8,
      }}
      exitStyle={{ opacity: 0.8 }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>{item}</React.Fragment>
      ))}
    </YStack>
  );
};

export default List;
