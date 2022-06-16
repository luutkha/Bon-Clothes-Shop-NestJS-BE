import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomResponse } from 'src/base-entity/entities/custom-response';
import { ErrorEnum } from 'src/common/enum&constants/ErrorCode';
import { ResponseHelper } from 'src/common/function/ResponseHelper';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { ProductTypesService } from 'src/product-types/product-types.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private responseHelper = new ResponseHelper();
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productTypeService: ProductTypesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() {
    //TODO: pagination for this
    const listResult: Product[] = await this.productRepository.find({
      relations: {
        subProducts: true,
        type: true,
      },
    });
    if (listResult === null) {
      this.responseHelper.successPaginationResponse([]);
    } else {
      return this.responseHelper.successPaginationResponse(listResult);
    }
  }

  async findOne(id: number): Promise<CustomResponse<Product>> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        subProducts: true,
        type: true,
      },
    });
    if (product === null) {
      return this.responseHelper.failResponse(
        product,
        ErrorEnum.OBJECT_NOT_FOUND,
      );
    } else {
      return this.responseHelper.successResponse(product);
    }
  }

  async update(id: number, product: UpdateProductDto) {
    // repository.update() cannot auto update child object (oneToMany relations)
    return await this.productRepository.update(id, product);
  }

  remove(id: number) {
    //TODO
    // Must delete child object first
    return this.productRepository.delete(id);
  }
  async insertDummyData() {
    const listType: ProductType[] = await this.productTypeService.findAll();
    const listColor = [
      'Hổ phách',
      'Ametit',
      'Xanh berin',
      'Xanh da trời',
      'Be',
      'Nâu sẫm',
      'Đen',
      'Xanh dương',
      'Nâu',
      'Da bò',
      'Cam cháy',
      'Hồng y',
      'Đỏ yên chi',
      'Men ngọc',
      'Anh đào',
      'Xanh hoàng hôn',
      'chàm',
      'Xanh nõn chuối',
      'Xanh cô ban',
      'Đồng',
      'San hô',
      'Kem',
      'Đỏ thắm',
      'Xanh lơ (cánh chả)',
      'Lục bảo',
      'Vàng kim loại',
      'Xám',
      'Xanh lá cây',
      'Vòi voi',
      'Chàm',
      'Ngọc thạch',
      'Kaki',
      'Oải hương',
      'Vàng chanh',
      'Hồng sẫm',
      'Hạt dẻ',
      'Cẩm quỳ',
      'Hoa cà',
      'Lam sẫm',
      'Thổ hoàng',
      'Ô liu',
      'Da cam',
      'Lan tím',
      'Lòng đào',
      'Dừa cạn',
      'Hồng',
      'Mận',
      'Xanh thủy tinh',
      'Hồng đất',
      'Tía',
      'Đỏ',
      'Cá hồi',
      'Đỏ tươi',
      'Nâu đen',
      'Bạc',
      'Nâu tanin',
      'Mòng két',
      'Xanh Thổ',
      'Đỏ son',
      'Tím',
      'Xanh crôm',
      'Trắng',
      'Vàng',
    ];
    const listName = [
      '2. Elise',
      '3. Vascara',

      ' 4. Juno',

      '5. Gumac',

      '6. IVY Moda',

      '7. HNOSS',
      '8. SIXDO',

      '9. FM Style',

      '10. NEM Fashion',

      '11. Canifa',

      '12. Yody',

      '13. Adam Store',

      '14. YAME',
      ,
      '15. Biluxury',

      '16. Owen',

      '17. Việt Tiến',

      '18. An Phước – Pierre Cardin',

      '19. SSStutter',

      '20. Routine',
    ];
    const listProduct: Product[] = [];
    for (let i = 0; i < listType.length; i++) {
      for (let j = 0; j < listName.length; j++) {
        for (let k = 0; k < listColor.length; k++) {
          const product = new Product();

          product.basePrice = (i + 1) * (j + 1) * (k + 1);
          product.description =
            'Sản phẩm ' +
            listType[i].displayName +
            'màu ' +
            listColor[k] +
            ' của hãng ' +
            listName[j];
          product.name =
            listType[i].displayName + ' ' + listColor[k] + ' ' + listName[j];
          product.subProducts = [];
          product.type = listType[i];
          this.productRepository.save(product);
          listProduct.push(product);
        }
      }
    }

    return listProduct;
  }
}
