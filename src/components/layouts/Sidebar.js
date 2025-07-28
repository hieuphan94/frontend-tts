'use client';

import { getMenuItems } from '@/configs/menuItems';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = getMenuItems().operator;

  return (
    <div className="bg-white border-r relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:block min-h-screen w-48">
        <Listbox
          aria-label="Menu"
          className="p-3 gap-2"
          onAction={(key) => {
            const item = menuItems.find((item) => item.key === key);
            if (item) {
              router.push(item.href);
            }
          }}
          selectedKeys={['operator']}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <ListboxItem
                key={item.key}
                startContent={<Icon className="w-5 h-5 mr-2" />}
                className="text-gray-600 rounded-lg hover:bg-gray-100 px-3"
              >
                <span className="truncate">{item.label}</span>
              </ListboxItem>
            );
          })}
        </Listbox>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => router.push(item.href)}
                className="p-2 rounded-full text-gray-600"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
