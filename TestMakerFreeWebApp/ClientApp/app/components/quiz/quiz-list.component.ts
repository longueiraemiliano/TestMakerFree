import { Component, Inject, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "quiz-list",
    templateUrl: "./quiz-list.component.html",
    styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent {
    title: string;
    selectedQuiz: Quiz;
    quizzes: Quiz[];
    @Input() class: string;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        var url = baseUrl + "/api/quiz/";

        switch (this.class) {
            case "latest":
                this.title = "Latest Quizzes";
                url += "Latest";
                break;
            case "byTitle":
                this.title = "Quizzes by Title";
                url += "ByTitle/";
                break;
            case "random":
                this.title = "Random Quizzes";
                url += "Random/";
                break;
        }

        http.get<Quiz[]>(baseUrl).subscribe(result => {
            this.quizzes = result;
        }, error => {
            console.error(error);
        });
    }

    onSelectQuiz(quiz: Quiz) {
        this.selectedQuiz = quiz;
        console.log("quiz with Id: " + quiz.Id + " Title: " + quiz.Title);
    }
}

