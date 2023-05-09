import { Component, Input, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post/post-service.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  post: any;

  @Input() id: number=0;

  constructor(private postService: PostServiceService, ) { }


  ngOnInit() {
    const getListUser:any[] = JSON.parse(localStorage.getItem('listUser') || "");
    this.postService.getPost(this.id).subscribe((result: any) => {
        const listUser:any[] = getListUser.filter((list:any)=>list.id===result?.userId);
        this.postService.getPostComment(result?.id).subscribe((res: any[]) => {
        result.user = listUser.length>0?listUser[0].username:"-";
        result.comments = res;
      });
      this.post = result;
    });
  }
}
