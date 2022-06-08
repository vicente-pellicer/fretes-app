import { BsTrash } from "react-icons/bs";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FormCargo } from "./FormCargo";
import { delCargo } from "../services/api";

type ItemProps = {
  cargoId: string;
  name: string;
  description: string;
  shipping: string;
  cep: string;
};

export function ItemCargo({
  cargoId,
  name,
  description,
  shipping,
  cep
}: ItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteCargo(cargoId) {
    let data = await delCargo(cargoId);
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
            <BsTrash color="red" onClick={() => deleteCargo(cargoId)} />
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
            <b>Desc.: </b>
            {description}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>Ship.: </b>
            {shipping}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>CEP.: </b>
            {cep}
          </Text>
        </Flex>
      </Flex>
      <FormCargo
        isOpen={isOpen}
        onClose={onClose}
        isEdit
        _id={cargoId}
        _name={name}
        _desc={description}
        _shipping={shipping}
        _cep={cep}
      />
    </>
  );
}
