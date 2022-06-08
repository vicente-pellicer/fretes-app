import { BsTrash } from "react-icons/bs";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FormShipping } from "./FormShipping";
import { delShipping } from "../services/api";

type ItemProps = {
  shippingId: string;
  driverId: string;
  driver: string;
  vehicleId: string;
  vehicle: string;
  cargoId: string;
  cargo: string;
  description: string;
};

export function ItemShipping({
  shippingId,
  driverId,
  driver,
  vehicleId,
  vehicle,
  cargoId,
  cargo,
  description
}: ItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteShipping(shippingId) {
    let data = await delShipping(shippingId);
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
            <BsTrash color="red" onClick={() => deleteShipping(shippingId)} />
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
            <b>Motorista: </b>
            {driver}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>Veículo: </b>
            {vehicle}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>Carga: </b>
            {cargo}
          </Text>
          <Text noOfLines={1} textOverflow="ellipsis">
            <b>Desc.: </b>
            {description}
          </Text>
        </Flex>
      </Flex>
      <FormShipping
        isOpen={isOpen}
        onClose={onClose}
        isEdit
        _id={shippingId}
        _driver={driverId}
        _vehicle={vehicleId}
        _cargo={cargoId}
        _description={description}
      />
    </>
  );
}
