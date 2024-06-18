"use client";
import { Button, Col, Flex, Form, FormProps, InputNumber, InputProps, message, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import SelectAssets from "./SelectAssets";
import { Token } from "../types/tokens";
import { useState } from "react";

type FormTypes = {
  inputAmount: number;
  inputPrice: number;
  outputAmount: number;
  outputPrice: number;
};
const SwapForm = ({ data }: { data: Token[] }) => {
  const [form] = Form.useForm<FormTypes>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish: FormProps<any>["onFinish"] = (values) => {
    const success = () => {
      messageApi.open({
        type: "success",
        content: "Swap Successfully",
        style: {
          marginTop: "20vh",
        },
      });
    };
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success();
    }, 2000);

    form.resetFields();
  };

  const onFinishFailed: FormProps<FormTypes>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="currencySwap"
        layout="vertical"
        initialValues={{ inputPrice: 1, outputPrice: 1 }}
        requiredMark={false}
        validateTrigger=""
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Row>
          <Col span={15}>
            <FormItem<FormTypes>
              label="Send"
              name={"inputAmount"}
              rules={[{ required: true, message: "Please enter the input amount!" }]}>
              <InputNumber
                min={0}
                placeholder="Input Amount"
                style={{ width: "100%", borderRadius: "0", background: "transparent", borderStyle: "none" }}
                controls={false}
                onChange={(value) => {
                  const { inputPrice, outputPrice } = form.getFieldsValue(["inputPrice", "outputPrice"]);
                  if (value && inputPrice && outputPrice) {
                    const result = (value * inputPrice) / outputPrice;
                    form.setFieldsValue({ outputAmount: result });
                  } else {
                    form.setFieldsValue({ outputAmount: undefined });
                  }
                }}
              />
            </FormItem>
          </Col>
          <Col
            span={9}
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <FormItem<FormTypes>
              label=""
              name={"inputPrice"}>
              <SelectAssets
                name="inputPrice"
                data={data}
                form={form}
              />
            </FormItem>
          </Col>
          <Col span={15}>
            <FormItem<FormTypes>
              label="Receive"
              name={"outputAmount"}>
              <InputNumber
                disabled
                placeholder="Receive Amount"
                style={{ width: "100%", borderRadius: "0", background: "transparent", borderStyle: "none" }}
                controls={false}
              />
            </FormItem>
          </Col>
          <Col
            span={9}
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <FormItem<FormTypes>
              label=""
              name={"outputPrice"}>
              <SelectAssets
                name="outputPrice"
                data={data}
                form={form}
              />
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button
            style={{
              width: "100%",
              height: "42px",
              fontWeight: "500",
              fontSize: "1.5em",
              background: "#d5920e",
              color: "#fff",
              borderStyle: "none",
              letterSpacing: "1px",
            }}
            htmlType="submit"
            loading={loading}>
            SWAP
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default SwapForm;
