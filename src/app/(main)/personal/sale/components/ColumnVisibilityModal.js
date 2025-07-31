import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox } from '@nextui-org/react';

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'title', label: 'Title' },
  { key: 'numberOfDays', label: 'Number of Days' },
  { key: 'globalPax', label: 'Global Pax' },
  { key: 'customer', label: 'Customer' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'totalPrice', label: 'Total Price' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

export default function ColumnVisibilityModal({ open, onClose, visibleColumns = [], onChange }) {
  return (
    <Modal isOpen={open} onClose={onClose} placement="center" size="3xl">
      <ModalContent>
        <ModalHeader className="text-base font-semibold">Select columns to display</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {columns.map(col => (
              <Checkbox
                key={col.key}
                isSelected={visibleColumns.includes(col.key)}
                onChange={() => {}}
                className="text-sm"
              >
                {col.label}
              </Checkbox>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}