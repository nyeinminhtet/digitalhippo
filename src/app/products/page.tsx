import MaxWrapperWidth from "@/components/MaxWrapperWidth";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import React from "react";

type Params = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: {
    [key: string]: Params;
  };
}

const parse = (param: Params) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <MaxWrapperWidth>
      <ProductReel
        title={label ?? "Browse high-quality assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWrapperWidth>
  );
};

export default ProductsPage;
