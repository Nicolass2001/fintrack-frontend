import { Avatar, Group, Menu, UnstyledButton, Text } from "@mantine/core";
import { IconChevronDown, IconLogout, IconSettings } from "@tabler/icons-react";
import classes from "./UserMenu.module.css";
import { useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import cx from "clsx";
import { User } from "~/types/user";

export function UserMenu() {
  const { user } = useLoaderData() as { user: User };
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group gap={7}>
            {user.image ? (
              <Avatar src={user.image} alt={user.email} radius="xl" size={20} />
            ) : (
              <Avatar
                alt={user.email}
                key={user.name}
                name={user.name}
                color="initials"
                radius="xl"
                size={20}
              />
            )}
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconSettings size={16} stroke={1.5} />}
          component={Link}
          to="/settings"
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout size={16} stroke={1.5} />}
          component={Link}
          to="/logout"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
