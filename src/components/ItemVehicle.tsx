import { BsTrash } from "react-icons/bs";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FormVehicle } from "./FormVehicle";
import { delVehicle } from "../services/api";

type ItemProps = {
  vehicleId: string;
  name: string;
  description: string;
  licensePlate: string;
  manufacturingYear: string;
};

export function ItemVehicle({
  vehicleId,
  name,
  description,
  licensePlate,
  manufacturingYear
}: ItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteVehicle(vehicleId) {
    let data = await delVehicle(vehicleId);
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
          <Flex gap={2}>
            <BsTrash color="red" onClick={() => deleteVehicle(vehicleId)} />
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
            <b>Placa: </b>
            {licensePlate}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>Ano: </b>
            {manufacturingYear}
          </Text>
        </Flex>
      </Flex>
      <FormVehicle
        isOpen={isOpen}
        onClose={onClose}
        isEdit
        _id={vehicleId}
        _name={name}
        _description={description}
        _licensePlate={licensePlate}
        _manufacturingYear={manufacturingYear}
      />
    </>
  );
}
