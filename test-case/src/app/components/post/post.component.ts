import { Component, Input, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post/post-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  data: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  pagedData: any[] = [];
  pages: number[] = [];

  @Input() authPayload: any;

  constructor(private postService: PostServiceService, ) { }

  paginate(array: any[], pageSize: number, currentPage: number) {
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / pageSize);
  
    let startPage: number, endPage: number;
    if (totalPages <= 3) {
      // show all pages if there are less than 3
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 2) {
      // show first 3 pages if current page is 1 or 2
      startPage = 1;
      endPage = 3;
    } else if (currentPage + 1 >= totalPages) {
      // show last 3 pages if current page is last or second last
      startPage = totalPages - 2;
      endPage = totalPages;
    } else {
      // show 3 pages around current page
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(i => startPage + i);
  
    return { pagedItems: array.slice(startIndex, endIndex + 1), pages };
  }

  ngOnInit() {
    const getListUser:any[] = JSON.parse(localStorage.getItem('listUser') || "");
    this.postService.getListPost().subscribe((posts: any[]) => {
      this.data = posts.map((post)=>{
        const listUser:any[] = getListUser.filter((list:any)=>list.id===post?.userId);
        post.user = listUser.length>0?listUser[0].username:"-";
        this.postService.getPostComment(post?.id).subscribe((res: any[]) => {
          post.comments = res;
        });
        return post;
      });
      const result = this.paginate(this.data, this.pageSize, this.currentPage);
      this.pagedData = result.pagedItems;
      this.pages = result.pages;
    });
  }
  
  onPageChanged(pageNumber: number) {
    this.currentPage = pageNumber;
    const result = this.paginate(this.data, this.pageSize, this.currentPage);
    this.pagedData = result.pagedItems;
    this.pages = result.pages;
  }
}
