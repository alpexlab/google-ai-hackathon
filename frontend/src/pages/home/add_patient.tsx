import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function AddPatient() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white m-1">Add Patient</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Details</h4>
            <p className="text-sm text-muted-foreground">
              Add the known details of the Patient
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                id="width"
                defaultValue=""
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Age</Label>
              <Input
                id="maxWidth"
                defaultValue=""
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Cancer Type</Label>
              <Input
                id="height"
                defaultValue=""
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">TNM Stages</Label>
              <Input
                id="maxHeight"
                defaultValue=""
                className="col-span-2 h-8"
              />
              <Button variant="outline" className="bg-blue-600 text-white">Add</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
