import * as React from "react";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  Container,
  Text,
  Input,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";
import arrow from "../src/assets/arrow.svg";
import backgroundDS from "../src/assets/backgroundDS.png";
import MakerPosition from "./MakerPosition";

function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const getInitialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress`
        );
        const data = await res.json();
        setAddress(data);
      };
      getInitialData();
    } catch (error) {
      console(error);
    }
  }, []);

  async function getEnteredAddress() {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        process.env.REACT_APP_API_KEY
      }&${
        checkIpAddress.test(ipAddress)
          ? `&ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `&domain=${ipAddress}`
          : ""
      }`
    );
    const data = await res.json();
    setAddress(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("");
  }

  return (
    <ChakraProvider>
      <>
        <Box>
          <Box position={"absolute"}>
            <Image
              src={backgroundDS}
              alt=""
              width={"100%"}
              height={"20rem"}
              objectFit={"cover"}
            />
          </Box>
          <Container position={"relative"} padding={"2rem"} maxWidth={"xl"}>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                mb={"1rem"}
                textColor={"#fff"}
                fontWeight={600}
                fontSize={{ lg: "28px", base: "22px" }}
              >
                IP Address Tracker
              </Text>
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                style={{ width: "100%" }}
              >
                <Flex>
                  <Input
                    type="text"
                    placeholder="Search for any IP address or domain"
                    borderBottomEndRadius={"0"}
                    borderTopEndRadius={"0"}
                    bgColor={"#fff"}
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                  ></Input>
                  <Button
                    type="submit"
                    borderTopLeftRadius={"0"}
                    borderBottomLeftRadius={"0"}
                    bgColor={"#000"}
                  >
                    <Image src={arrow} alt="" />
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Container>
          {address && (
            <>
              <Box
                mx={{ lg: "auto", base: "2rem" }}
                maxWidth={"7xl"}
                mb={"-4rem"}
                zIndex={"10000"}
                position={"relative"}
                bgColor={"#fff"}
                padding={"2rem"}
                borderRadius={"10px"}
                boxShadow={"0px 10px 15px -3px rgba(0, 0, 0, 0.1)"}
              >
                <Flex
                  gap={"3rem"}
                  justifyContent={"space-around"}
                  alignItems={"flex-start"}
                  flexDir={{ lg: "row", base: "column" }}
                >
                  <Box
                    borderRight={{ lg: "1px", base: "0" }}
                    borderRightColor={"hsl(0, 0%, 59%)"}
                    paddingRight={{ lg: "4rem", base: "0" }}
                  >
                    <Text
                      fontSize={"14px"}
                      textColor={"hsl(0, 0%, 59%)"}
                      fontWeight={600}
                      letterSpacing={"0.05rem"}
                      mb={{ lg: "0.75rem", base: "0.5rem" }}
                    >
                      IP ADDRESS
                    </Text>
                    <Text
                      fontWeight={700}
                      textColor={"hsl(0, 0%, 17%)"}
                      fontSize={{ lg: "24px", base: "xl" }}
                    >
                      {address?.ip}
                    </Text>
                  </Box>
                  <Box
                    borderRight={{ lg: "1px", base: "0" }}
                    borderRightColor={"hsl(0, 0%, 59%)"}
                    paddingRight={{ lg: "4rem", base: "0" }}
                  >
                    <Text
                      fontSize={"14px"}
                      textColor={"hsl(0, 0%, 59%)"}
                      fontWeight={600}
                      letterSpacing={"0.05rem"}
                      mb={{ lg: "0.75rem", base: "0.5rem" }}
                    >
                      LOCATION
                    </Text>
                    <Text
                      fontWeight={700}
                      textColor={"hsl(0, 0%, 17%)"}
                      fontSize={{ lg: "24px", base: "xl" }}
                    >
                      {address?.location?.city}, {address?.location?.region}
                    </Text>
                  </Box>
                  <Box
                    borderRight={{ lg: "1px", base: "0" }}
                    borderRightColor={"hsl(0, 0%, 59%)"}
                    paddingRight={{ lg: "4rem", base: "0" }}
                  >
                    <Text
                      fontSize={"14px"}
                      textColor={"hsl(0, 0%, 59%)"}
                      fontWeight={600}
                      letterSpacing={"0.05rem"}
                      mb={{ lg: "0.75rem", base: "0.5rem" }}
                    >
                      TIMEZONE
                    </Text>
                    <Text
                      fontWeight={700}
                      textColor={"hsl(0, 0%, 17%)"}
                      fontSize={{ lg: "24px", base: "xl" }}
                    >
                      UTC {address?.location?.timezone}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={"14px"}
                      textColor={"hsl(0, 0%, 59%)"}
                      fontWeight={600}
                      letterSpacing={"0.05rem"}
                      mb={{ lg: "0.75rem", base: "0.5rem" }}
                    >
                      ISP
                    </Text>
                    <Text
                      fontWeight={700}
                      textColor={"hsl(0, 0%, 17%)"}
                      fontSize={{ lg: "24px", base: "xl" }}
                    >
                      {address?.isp}
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <MapContainer
                center={[address?.location?.lat, address?.location?.lng]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "600px", weight: "100vh" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MakerPosition address={address} />
              </MapContainer>
            </>
          )}
        </Box>
      </>
    </ChakraProvider>
  );
}

export default App;
