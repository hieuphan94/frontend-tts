import { Modal, ModalContent, ModalHeader, ModalBody, Button, Checkbox, Select, SelectItem } from '@nextui-org/react';

const subData = [
  {
    id: 1,
    name: 'Mường Thanh',
  },
  {
    id: 2,
    name: 'Legend',
  },
  {
    id: 3,
    name: 'Acros',
  },
  {
    id: 4,
    name: 'Vinpearl',
  },
  
]; 

const groupList = [
  {
    id: 1,
    name: 'Mường Thanh',
  },

  
];

export function GroupSelectModal({
  open,
  onClose,
  onSelectAll,
  onSave,
}) {
  return (
    <Modal isOpen={open} onOpenChange={onClose} size="xl">
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <div className="flex gap-2 items-center mb-2">
            <Button size="sm" variant="bordered" onPress={onSelectAll} className="text-xs px-2 py-1 min-h-0 h-auto">
              Select All
            </Button>
          </div>
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mb-3">
            {groupList.map(g => (
              <Checkbox
                key={g.id}
                size="sm"
                classNames={{ label: 'text-xs' }}
              >
                {g.name}
              </Checkbox>
            ))}
          </div>
          <div className="flex gap-2 items-center mb-2">
            <Select
              placeholder="Select group to add..."
              size="sm" 
              classNames={{ trigger: 'text-xs min-h-0 h-auto', value: 'text-xs', listbox: 'text-xs' }}
            >
              {subData
                .map(g => (
                  <SelectItem key={g.id} value={g.name} className="text-xs">{g.name}</SelectItem>
                ))}
            </Select>
            <Button size="sm" variant="bordered" className="text-xs px-2 py-1 min-h-0 h-auto">
              Add
            </Button>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button size="sm" variant="light" onPress={onClose} className="text-xs px-2 py-1 min-h-0 h-auto">
              Cancel
            </Button>
            <Button size="sm" color="primary" onPress={onSave} className="text-xs px-2 py-1 min-h-0 h-auto">
              Save
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}