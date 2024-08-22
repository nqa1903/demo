import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "database", "products.json");

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const product = products.find((product: any) => product.id === +params.id);

    if (product) {
      return NextResponse.json({ product });
    } else {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm ní ơi" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "database", "products.json");

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const findIndex = products.findIndex(
      (product: any) => product.id === +params.id
    );

    if (findIndex !== -1) {
      const body = await request.json();

      products[findIndex] = { ...products[findIndex], ...body };

      fs.writeFileSync(filePath, JSON.stringify(products), "utf8");

      return NextResponse.json({
        message: "Cập nhập thành công nha ní",
        updateProduct: products[findIndex],
      });
    } else {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm ní ơi" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "database", "products.json");

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const findIndex = products.findIndex(
      (product: any) => product.id === +params.id
    );

    if (findIndex !== -1) {
      const deleteProduct = products.splice(findIndex, 1);

      fs.writeFileSync(filePath, JSON.stringify(products), "utf8");

      return NextResponse.json({ message: "Xóa sản phẩm thành công nha ní" });
    } else {
      return NextResponse.json({ message: "Không tìm thấy sản phẩm ní ơi" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}
