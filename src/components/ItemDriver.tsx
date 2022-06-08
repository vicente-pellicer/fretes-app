import { BsTrash } from "react-icons/bs";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FormDriver } from "./FormDriver";
import { delDriver } from "../services/api";

type ItemProps = {
  driverId: string;
  name: string;
  cpf: string;
  birthdate: string;
};

export function ItemDriver({ driverId, name, cpf, birthdate }: ItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteDriver(driverId) {
    let data = await delDriver(driverId);
    console.log(data);
  }

  return (
    <>
      <Flex
        width="100%"
        minH="16rem"
        maxH="16rem"
        background="#EEE"
        borderRadius="12px"
        boxShadow="md"
        direction="column"
        justify="center"
        alignSelf="center"
        alignItems="center"
        cursor="pointer"
      >
        <Flex w="100%" h="auto" p={2} justify="end">
          <Flex zIndex="999">
            <BsTrash color="red" onClick={() => deleteDriver(driverId)} />
          </Flex>
        </Flex>
        <Flex
          grow={1}
          mt={4}
          mx={4}
          direction="column"
          textAlign="left"
          onClick={onOpen}
        >
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>Nome: </b>
            {name}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>CPF.: </b>
            {cpf}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>Nasc.: </b>
            {birthdate}
          </Text>
        </Flex>
      </Flex>
      <FormDriver
        isOpen={isOpen}
        onClose={onClose}
        isEdit
        _id={driverId}
        _name={name}
        _cpf={cpf}
        _birthdate={birthdate}
      />
    </>
  );
}
