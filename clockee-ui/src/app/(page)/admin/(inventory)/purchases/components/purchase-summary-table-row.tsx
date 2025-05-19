"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { formatVND } from "@/util/currency";
import { PurchaseSummary } from "@/gen";

type PurchaseTableRowProps = {
  item: PurchaseSummary;
  onDelete: (item: PurchaseSummary) => void;
  onChange: (oldItem: PurchaseSummary, newItem: PurchaseSummary) => void;
};

const PurchaseSummaryTableRow = ({
  item,
  onDelete,
  onChange,
}: PurchaseTableRowProps) => {
  const handleDelete = async () => {
    try {
      onDelete(item);
      toast("Xóa thành công");
    } catch (e) {
      toast(e as string);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleChange = async (newItemValue: PurchaseSummary) => {
    onChange(item, newItemValue);
  };

  return (
    <tr>
      <td>{item.purchaseId}</td>
      <td>{item.createdAt}</td>
      <td>
        <span className="badge badge-md font-medium  badge-soft badge-neutral">
          {item.status}
        </span>
      </td>
      <td>{item.createdByUsername}</td>
      <td>{formatVND(item.totalPrice)}</td>
      <td
        onClick={() => {
          setIsEditModalOpen(true);
        }}
        className="hover:bg-gray-200"
      >
        {/* Action edit */}
        <i className="fa fa-edit"></i>
      </td>
      <td onClick={handleDelete} className="hover:bg-gray-200">
        {/* Action delete */}
        <i className="fa fa-trash"></i>
      </td>

      {/*
        *
      <EditPurchaseItemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        handleAddItem={handleChange}
        model={item}
      />
        */}
    </tr>
  );
};
export default PurchaseSummaryTableRow;
