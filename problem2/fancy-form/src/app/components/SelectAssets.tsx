"use client";
import { Token } from "@/app/types/tokens";
import { Flex, Form, FormInstance, Select, SelectProps } from "antd";
import Image from "next/image";

type Props = {
  name: string;
  data: Token[];
  form: FormInstance<any>;
};

const SelectAssets = (props: Props) => {
  const { name, data, form } = props;
  const iconBaseUrl = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";
  const dataFilter = data.filter((v, i, self) => {
    return self.findIndex((v1) => v1.currency === v.currency) === i;
  });

  const tokenOptions: SelectProps["options"] = dataFilter.map((t) => {
    if (t.currency.includes("ST") && !t.currency.includes("STRD")) {
      t.currency = t.currency.replace("ST", "st");
    }

    if (t.currency.includes("RATOM")) {
      t.currency = t.currency.replace("RATOM", "rATOM");
    }
    return {
      key: t.currency,
      value: t.price,
      label: (
        <Flex
          align="center"
          gap={10}>
          <Image
            alt="token-img"
            src={`${iconBaseUrl}${t.currency}.svg`}
            width={20}
            height={20}
          />
          <p>{t.currency}</p>
        </Flex>
      ),
    };
  });

  const handleChange: SelectProps["onChange"] = (value) => {
    if (name === "inputPrice") {
      form.setFieldValue("inputPrice", value);
      const { inputAmount, outputPrice } = form.getFieldsValue(["inputAmount", "outputPrice"]);
      const result = (inputAmount * value) / outputPrice;
      form.setFieldValue("outputAmount", result);
    } else if (name === "outputPrice") {
      form.setFieldValue("outputPrice", value);
      const { inputAmount, inputPrice } = form.getFieldsValue(["inputAmount", "inputPrice"]);
      const result = (inputAmount * inputPrice) / value;
      form.setFieldValue("outputAmount", result);
    }
  };

  return (
    <Select
      defaultValue={1}
      options={tokenOptions}
      onChange={handleChange}
    />
  );
};

export default SelectAssets;
