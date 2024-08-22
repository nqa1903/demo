import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "database", "products.json");

    const data = fs.readFileSync(filePath, "utf8");

    const products = JSON.parse(data);

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const adminRequest = await request.json();

    const filePath = path.join(process.cwd(), "database", "products.json");

    const products = JSON.parse(fs.readFileSync(filePath, "utf8"));

    products.push(adminRequest);

    fs.writeFileSync(filePath, JSON.stringify(products), "utf8");

    return NextResponse.json({ message: "Thêm mới thành công nha ní" });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}
