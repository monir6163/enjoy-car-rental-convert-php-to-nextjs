"use client";

import { add } from "@/lib/store/features/product/productSlice";
import { useAppDispatch } from "@/lib/store/hooks/hooks";

export default function DataTransfer({ data }: { data: any }) {
  const dispatch = useAppDispatch();
  dispatch(add(data));
  return null;
}
