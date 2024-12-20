import { ReportFormData } from "@/api/types.ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setErrorToast } from "@/hooks/use-toast.tsx";
import { ReportFormSchema } from "@/validationSchemas/reportFormSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface BasicReportPopup {
  data?: ReportFormData;
  isForceOpen?: boolean;
  onClose?: () => void;
  onDelete?: () => Promise<void>;
  onSubmit?: (data: ReportFormData) => Promise<void>;
  title: string;
  trigger?: ReactNode;
}

export const BasicReportPopup: FC<BasicReportPopup> = ({
  data = undefined,
  isForceOpen = false,
  onClose,
  onDelete,
  onSubmit,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(() => isForceOpen);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ReportFormData>({
    resolver: zodResolver(ReportFormSchema),
    values: data,
  });

  useEffect(() => {
    if (!isOpen) {
      if (onClose) {
        onClose();
      }
      form.reset();
    }
  }, [isOpen]);

  const handleSubmit = form.handleSubmit(
    (e) => {
      if (onSubmit) {
        setIsLoading(true);
        onSubmit({ age: e.age, file: e.file, name: e.name })
          .then(async () => {
            setIsOpen(false);
            return null;
          })
          .catch((error: unknown) => {
            setErrorToast((error as Record<string, string>).message);
          });
      }
    },
    () => {
      setIsLoading(false);
    },
  );

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
        .then(async () => {
          setIsOpen(false);
          return null;
        })
        .catch((e: unknown) => {
          setErrorToast((e as Record<string, string>).message);
        });
    }
  };

  return (
    <Dialog
      onOpenChange={(value) => {
        setIsOpen(value);
      }}
      open={isOpen}
    >
      <DialogContent className="sm:max-w-[425px] text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3 text-gray-500"
                    placeholder="Pedro Duarte"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3 text-gray-500"
                    placeholder="15"
                    type="number"
                    onChange={(event) => {
                        onChange(Number(event.target.valueAsNumber));
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel>Attach file</FormLabel>
                <FormControl>
                  <Input
                    accept="image/*, application/pdf"
                    className="col-span-3 text-gray-500"
                    id="file"
                    onChange={(event) => {
                      onChange(event.target.files && event.target.files[0]);
                    }}
                    placeholder="15"
                    type="file"
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage className="col-span-4" />
              </FormItem>
            )}
          />
        </Form>
        <DialogFooter>
          {data ? (
            <>
              <Button onClick={handleDelete} type="submit">
                Delete
              </Button>
              <Button onClick={handleSubmit} type="submit">
                Save Changes
              </Button>
            </>
          ) : (
            <Button disabled={isLoading} onClick={handleSubmit} type="button">
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
