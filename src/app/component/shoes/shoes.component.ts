import { Component, OnInit } from '@angular/core';
import {Brand} from "../../model/brand";
import {Category} from "../../model/category";
import {Item} from "../../model/item";
import {BrandService} from "../../service/brand.service";
import {CategoryService} from "../../service/category.service";
import {ItemService} from "../../service/item.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {

  public brand: string;
  public category: string;
  public size: string = 'Все размеры';
  public brands_values: Brand[];
  public category_values: Category[];
  public slice: number = 4;
  public items: Item[];
  public viewItems: Item[];
  public sort: string;
  public sortValues: string[] = [];

  constructor(private brandService: BrandService, private categoryService: CategoryService,
              private itemService: ItemService, private router: Router) {
  }

  ngOnInit(): void {
    this.sortValues.push('Без сортировки', 'Цена по убыванию', 'Цена по возрастанию');
    this.sort = this.sortValues[0];
    this.brandService.getAllBrands().subscribe(
      data => {
        console.log(data);
        this.brands_values = data;
        this.brands_values.unshift(new Brand(0, 'Все бренды'));
        this.brand = this.brands_values[0].title;
      }
    );
    this.categoryService.getAllCategories().subscribe(
      data => {
        console.log(data);
        this.category_values = data;
        this.category_values.unshift(new Category(0, 'Все категории'));
        this.category = this.category_values[0].title;
      }
    );
    this.itemService.getAllItems().subscribe(
      data => {
        this.items = data.filter(i => i.chapter.title === 'Обувь');
        this.viewItems = this.items.slice(0, this.slice);
        console.log(this.viewItems);
      }
    )
  }

  public onChange(): void {
    console.log(this.brand);
  }

  public viewItem(id: number) {
    this.router.navigate(['item',id]);
  }

  public navigate(path: string) {
    console.log(path);
    this.router.navigate([path]);
  }

  public filterItems(): void {
    console.log(this.brand);
    console.log(this.category);
    console.log(this.size);

    // @ts-ignore
    this.itemService.getFilterItems(this.sort, this.category, this.brand, this.size)
      .subscribe((data) => {
        this.slice = 4;
        console.log(data);
        this.items = data;
        this.viewItems = this.items.slice(0, this.slice);
      });
  }

  public pagination() {
    this.slice += 4;
    this.viewItems = this.items.slice(0, this.slice);
  }
}
