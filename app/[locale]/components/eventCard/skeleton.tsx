import { Loader, Paper } from "@mantine/core";

const Skeleton = () => <Paper
  shadow="xl"
  p="sm"
  radius="md"
  withBorder
  className="h-40 flex max-w-full flex-col justify-center items-center bg-cover bg-center bg-buzzhub-yellow"
>
  <Loader id="loader" className="mx-auto" variant="bars" color="#545778" />
</Paper>;
export default Skeleton;