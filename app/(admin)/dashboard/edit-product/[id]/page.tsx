import EditProduct from "@/components/admin/EditProduct";
import prisma from "@/lib/db";

const page = async ({ params }: { params: any }) => {
  const id = params.id;
  const product: any = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return <EditProduct product={product} />;
};

export default page;
