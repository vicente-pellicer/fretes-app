import { Flex, Text } from "@chakra-ui/react";
import { BsMailbox, BsBox, BsPerson, BsTruck } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <Flex background="orange" pl={12} gap={10} height="3rem" align="center">
        <Text fontWeight="bold" fontSize="22">
          FRETES
        </Text>
        <NavLink to="/Shipping">
          <Flex align="center" gap={3}>
            <Text>Entregas</Text>
            <BsMailbox />
          </Flex>
        </NavLink>
        <NavLink to="/Cargo">
          <Flex align="center" gap={3}>
            <Text>Cargas</Text>
            <BsBox />
          </Flex>
        </NavLink>
        <NavLink to="/Driver">
          <Flex align="center" gap={3}>
            <Text>Motoristas</Text>
            <BsPerson />
          </Flex>
        </NavLink>
        <NavLink to="/Vehicle">
          <Flex align="center" gap={3}>
            <Text>Veículos</Text>
            <BsTruck />
          </Flex>
        </NavLink>
      </Flex>
    </>
  );
}
