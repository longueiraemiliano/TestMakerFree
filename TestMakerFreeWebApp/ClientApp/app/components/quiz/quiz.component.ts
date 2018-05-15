import { Component, Input, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: "quiz",
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent {
    quiz: Quiz;

    constructor(public auth: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.quiz = <Quiz>{};
        
        var id = +this.activatedRoute.snapshot.params["id"];
        console.log(id);

        if (id) {
            var url = this.baseUrl + "api/quiz/" + id;
            http.get<Quiz>(url).subscribe(result => {
                this.quiz = result;
            }, error => {
                console.error(error);
            });
        } else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate(["home"]);
        }
    }

    onEdit() {
        this.router.navigate(["quiz/edit", this.quiz.Id]);
    }

    onDelete() {
        var id = this.quiz.Id;
        var url = this.baseUrl + "api/quiz/" + id;
        if (confirm("Do you really want to delete this quiz?")) {
            this.http.delete(url).subscribe(res => {
                console.log("Quiz " + this.quiz.Id + " has been deleted");
                this.router.navigate(["home"]);
            }, error => {
                console.error(error);
            })
        }
    }
}