import React, { useState } from "react";
import CKEditor from "ckeditor4-react";
import { FormField, Segment } from "semantic-ui-react";
import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useDispatch } from "react-redux";

export default function InfoForm({ match, history, location }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  return (
    <Segment clearing>
      {/* <Form className="ui form">
        <MyTextInput
          name="title"
          placeholder="Title (required)"
          label="Title"
        />

        <FormField>
          <label>Description</label>
          <CKEditor
            data={text}
            onChange={(e) => {
              const data = e.editor.getData();
              setText(data);
            }}
          />
        </FormField>
      </Form> */}
    </Segment>
  );
}
