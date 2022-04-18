import { Component, OnInit } from '@angular/core';
import {BrandService} from "../../service/brand.service";
import {Brand} from "../../model/brand";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import {Chapter} from "../../model/chapter";
import {ChapterService} from "../../service/chapter.service";
import {ItemService} from "../../service/item.service";
import {AddItemDto} from "../../model/addItemDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public title: string = '';
  public description: string = '';
  public price: number = 0;
  public sizes: string = '';
  public photo_url: string = '';
  public brand: string;
  public category: string;
  public chapter: string;
  public brands_values: Brand[];
  public category_values: Category[];
  public chapter_values: Chapter[];

  constructor(private brandService: BrandService, private categoryService: CategoryService,
              private chapterService: ChapterService, private itemService: ItemService,
              private router: Router) { }

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe(
      data => {
        console.log(data);
        this.brands_values = data;
        this.brand = this.brands_values[0].title;
      }
    );
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.category_values = data;
        this.category = this.category_values[0].title;
      }
    );
    this.chapterService.getAllChapters().subscribe(
      data => {
        this.chapter_values = data;
        this.chapter = this.chapter_values[0].title;
      }
    )
  }

  public onChange(): void {
    console.log(this.brand);
  }

  public addItem(): void {
    this.itemService.addItem(new AddItemDto(this.title, this.description, this.price, this.photo_url,
      this.sizes, this.brands_values.filter(brand => brand.title === this.brand)[0].id,
      this.category_values.filter(cat => cat.title === this.category)[0].id,
      this.chapter_values.filter(c => c.title === this.chapter)[0].id)).subscribe(
        data => {
          this.router.navigate(['']);
        }
    );
  }
}
