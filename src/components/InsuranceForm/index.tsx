import { Button, DatePicker, Form, Input, Collapse, Divider, Select, Space, Modal, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Fragment, useState } from "react";
import generateRange from "./../../helpers/generateRange"
import ageValidator from "./../../validators/ageValidator"
import "./index.css"
const { Panel } = Collapse;
const { Text } = Typography;

const CURRENT_DATE = new Date();
const YEARS = generateRange(1985, CURRENT_DATE.getFullYear() + 1)

const generateRequireRule = (label: string) => ({ required: true, message: `Please input your ${label}!` })

const InsuranceForm = () => {

  const [activePanels, setActivePanels] = useState<string[]>(["0"])
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", { ...values, dob: values.dob.format("YYYY-MM-DD") });
    setSubmitSuccess(true)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    const length = form.getFieldValue("vehicles").length
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i.toString());
    }
    handleCollapseChange(arr);
  };
  const addVehicle = (cb: () => void) => {
    const vehicleFields = form.getFieldValue("vehicles");
    if (vehicleFields.length < 3) {
      cb();
    }
  };

  const removeVehicle = (fieldName: number, cb: (index: number | number[]) => void) => {
    const vehicleFields = form.getFieldValue("vehicles");
    if (vehicleFields.length > 1) {
      cb(fieldName);
    }
  };
  const handleCollapseChange = (keys: string[] | string) => {
    setActivePanels(keys as string[]);

  }
  const handleSubmitModalClose = () => {
    setSubmitSuccess(false);
    form.resetFields()
  }

  return (
    <div className="form-container">
      <Form
        className="form"
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          vehicles: [
            {
              vin: "",
              year: "",
              model: "",
            },
          ],
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[generateRequireRule("First name")]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[generateRequireRule("Last name")]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date of birth"
          name="dob"
          rules={[
            generateRequireRule("Date of birth"),
            {
              validator: ageValidator, message: "Age must be 16+"
            }
          ]}
        >
          <DatePicker disabledDate={(d) =>
            !d ||
            d.isAfter(CURRENT_DATE)
          } />
        </Form.Item>
        <Divider orientation="left">Address</Divider>

        <Form.Item
          label="Street"
          name="street"
          rules={[generateRequireRule("Street")]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[generateRequireRule("City")]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[generateRequireRule("State")]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ZipCode"
          name="zip"
          rules={[generateRequireRule("ZipCode")]}
        >
          <Input type="number" />
        </Form.Item>

        <Divider orientation="left">Vehicles</Divider>
        <Form.List name="vehicles">
          {(fields, { add, remove }) => (
            <>
              <Collapse onChange={handleCollapseChange} activeKey={activePanels}>
                {fields.map((field) => (
                  <Fragment key={`vehicles ${field.key}`}>
                    <Panel header={`Vehicle ${field.name + 1}`} key={field.key} forceRender>
                      <Form.Item noStyle>
                        <Form.Item
                          label="VIN"
                          name={[field.name, "vin"]}
                          rules={[
                            generateRequireRule("VIN")
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Year"
                          name={[field.name, "year"]}
                          rules={[
                            generateRequireRule("Year")
                          ]}
                        >
                          <Select
                            options={YEARS}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Make and Model"
                          name={[field.name, "model"]}
                          rules={[
                            generateRequireRule("Make and Model")
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Space className="button-wrapper">
                          <Button
                            type="primary"
                            danger
                            onClick={() => removeVehicle(field.name, remove)}
                            icon={<MinusCircleOutlined />}
                          >
                            remove vehicle
                          </Button>
                        </Space>
                      </Form.Item>
                    </Panel>
                  </Fragment>
                ))}
              </Collapse>
              <Space className="button-wrapper">
                <Button
                  type="primary"
                  className="add-btn"
                  onClick={() => addVehicle(add)}
                  icon={<PlusOutlined />}
                >
                  Add vehicle
                </Button>
              </Space>
            </>
          )}
        </Form.List>
        <Space className="button-wrapper">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
      <Modal title="Form Submitted!" open={submitSuccess} onOk={handleSubmitModalClose} onCancel={handleSubmitModalClose}>
        <Text>Your form is submitted successfully!</Text>
      </Modal>
    </div>
  );
};

export default InsuranceForm;
