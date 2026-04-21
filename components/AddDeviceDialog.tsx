"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["router", "camera", "smart-home", "industrial", "sensor", "other"] as const;

const schema = z.object({
  name: z.string().min(2, "Device name is required"),
  vendor: z.string().min(2, "Vendor is required"),
  model: z.string().min(2, "Model is required"),
  ipAddress: z.string().min(7, "IP address is required"),
  macAddress: z.string().min(6, "MAC address is required"),
  firmwareVersion: z.string().min(1, "Firmware version is required"),
  category: z.enum(categories)
});

type DeviceForm = z.infer<typeof schema>;

export function AddDeviceDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<DeviceForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "router"
    }
  });

  const submit = form.handleSubmit(async (values) => {
    const response = await fetch("/api/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      return;
    }

    setOpen(false);
    window.location.reload();
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add Device
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-[#0d1117] p-5 shadow-2xl">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Dialog.Title className="text-lg font-semibold text-zinc-100">
                Register IoT Device
              </Dialog.Title>
              <Dialog.Description className="text-sm text-zinc-400">
                Add a device to monitor firmware exposure and patch compliance.
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-zinc-400" htmlFor="name">
                Device Name
              </label>
              <Input id="name" placeholder="Main Office Router" {...form.register("name")} />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400" htmlFor="vendor">
                Vendor
              </label>
              <Input id="vendor" placeholder="Ubiquiti" {...form.register("vendor")} />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400" htmlFor="model">
                Model
              </label>
              <Input id="model" placeholder="UniFi Dream Machine" {...form.register("model")} />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400" htmlFor="ipAddress">
                IP Address
              </label>
              <Input id="ipAddress" placeholder="192.168.1.1" {...form.register("ipAddress")} />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400" htmlFor="macAddress">
                MAC Address
              </label>
              <Input id="macAddress" placeholder="00:11:22:33:44:55" {...form.register("macAddress")} />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400" htmlFor="firmwareVersion">
                Firmware Version
              </label>
              <Input
                id="firmwareVersion"
                placeholder="7.4.156"
                {...form.register("firmwareVersion")}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400">Category</label>
              <Select.Root
                value={form.watch("category")}
                onValueChange={(value) => {
                  form.setValue("category", value as DeviceForm["category"]);
                }}
              >
                <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-700 bg-zinc-950 px-3 text-sm text-zinc-200">
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDown className="h-4 w-4" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="z-50 overflow-hidden rounded-md border border-zinc-700 bg-zinc-950 shadow-lg">
                    <Select.Viewport className="p-1">
                      {categories.map((category) => (
                        <Select.Item
                          key={category}
                          value={category}
                          className="relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm text-zinc-200 outline-none hover:bg-zinc-800"
                        >
                          <Select.ItemIndicator className="absolute left-2">
                            <Check className="h-4 w-4" />
                          </Select.ItemIndicator>
                          <Select.ItemText>{category}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="mt-1 flex justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Device</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
