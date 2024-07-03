import { Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

type TActivitiesProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const DrdActivitiesInput = ({
  name,
  label,
  placeholder,
  required,
}: TActivitiesProps) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  if (fields.length === 0) {
    append("");
  }

  return (
    <div className="w-full">
      <FormItem label={label} required={required}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-2">
            <Controller
              name={`${name}[${index}]`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    placeholder={placeholder}
                    size="large"
                    id={`${name}[${index}]`}
                  />
                  {error && (
                    <small className="text-red-500">{error.message}</small>
                  )}
                </div>
              )}
            />
            <Button onClick={() => remove(index)} style={{ marginLeft: "8px" }}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="dashed" onClick={() => append("")} block>
          Add Activity
        </Button>
      </FormItem>
    </div>
  );
};

export default DrdActivitiesInput;
