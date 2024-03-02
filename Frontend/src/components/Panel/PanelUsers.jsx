import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteRegister, fetchRegisters } from "../../Redux/actions";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

function PanelUsers() {

  const dispatch = useDispatch();
  const Registers = useSelector((state) => state.Registers);


  useEffect(() => {
    dispatch(fetchRegisters());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteRegister(id));
  };


  const defaultColumns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "username",
      dataIndex: "username",
      width: "30%",
      editable: true,
    },
    {
      title: "password",
      dataIndex: "password",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_, record) =>
      Registers.length >= 1 ? (
          <Popconfirm
            onConfirm={() => handleDelete(record.id)} 
            title="Are you sure you want to delete this item?"
            okText="Yes"
            cancelText="No"
          >
            <Button className=" bg-red-600" type="danger" size="small">
              Delete
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });


  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={Registers}
        columns={columns}
      />
    </div>
  );
}

export default PanelUsers;
