import { Component, OnInit } from '@angular/core';
import {Brand} from "../../model/brand";
import {Category} from "../../model/category";
import {Item} from "../../model/item";
import {BrandService} from "../../service/brand.service";
import {CategoryService} from "../../service/category.service";
import {ItemService} from "../../service/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  private subs: Subscription[] = [];
  private itemId: number;
  public item: Item;
  public itemSizes: string[];
  public size: string;

  constructor(private brandService: BrandService, private categoryService: CategoryService,
              private itemService: ItemService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subs.push(this.route.params.subscribe(params => {
      this.itemId = Number.parseInt(params['id']);
      this.subs.push(this.itemService.getItemById(this.itemId).subscribe(item => {
        this.item = item;
        this.itemSizes = item.sizes.replace(/\s+/g, '').split(",");
        this.itemSizes.unshift("Размер");
        console.log(this.itemSizes)
        this.size = this.itemSizes[0];
        console.log(item);
      }));
    }))
  }
}
