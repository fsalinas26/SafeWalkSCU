const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

//   function test()
//   {
//     return
//     <Box
//         p={4}
//         borderRadius="lg"
//         m={4}
//         bgColor="white"
//         shadow="base"
//         minW="container.md"
//         zIndex="1"
//       >
//         <HStack spacing={2} justifyContent="space-between">
//           <Box flexGrow={1}>
//             <Autocomplete>
//               <Input type="text" placeholder="Origin" ref={originRef} />
//             </Autocomplete>
//           </Box>

//           <Box flexGrow={1}>
//             <Autocomplete>
//               <Input
//                 type="text"
//                 placeholder="Destination"
//                 ref={destiantionRef}
//               />
//             </Autocomplete>
//           </Box>

//           <ButtonGroup>
//             <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
//               Calculate Route
//             </Button>
//             <IconButton
//               aria-label="center back"
//               icon={<FaTimes />}
//               onClick={clearRoute}
//             />
//           </ButtonGroup>
//         </HStack>
//         <HStack spacing={4} mt={4} justifyContent="space-between">
//           <Text>Distance: {distance} </Text>
//           <Text>Duration: {duration} </Text>
//           <IconButton
//             aria-label="center back"
//             icon={<FaLocationArrow />}
//             isRound
//             onClick={() => {
//               map.panTo(center)
//               map.setZoom(15)
//             }}
//           />
//         </HStack>
//       </Box>
//   }
