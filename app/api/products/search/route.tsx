import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")?.toLowerCase();

    if (!name) {
      return NextResponse.json({ message: "Đưa tên sản phẩm ní" });
    }

    const filePath = path.join(process.cwd(), "database", "products.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const filteredProducts = products.filter((product: any) =>
      product.name.toLowerCase().includes(name)
    );

    if (filteredProducts.length > 0) {
      return NextResponse.json({ products: filteredProducts });
    } else {
      return NextResponse.json({ message: "Không thấy ní ơi" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}
