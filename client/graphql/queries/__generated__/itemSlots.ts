/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: itemSlots
// ====================================================

export interface itemSlots_itemSlots_itemTypes {
  __typename: "ItemType";
  id: any;
  name: string;
}

export interface itemSlots_itemSlots {
  __typename: "ItemSlot";
  id: any;
  name: string;
  itemTypes: (itemSlots_itemSlots_itemTypes | null)[] | null;
}

export interface itemSlots {
  itemSlots: itemSlots_itemSlots[];
}
