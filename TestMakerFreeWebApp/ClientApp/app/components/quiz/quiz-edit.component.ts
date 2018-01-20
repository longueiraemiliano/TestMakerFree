import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: "quiz-edit",
    templateUrl: "./quiz-edit.component.html",
    styleUrls: ["./quiz-edit.component.css"]
})

export class QuizEditComponent {
    title: string;
    quiz: Quiz;
    editMode: boolean;
    form: FormGroup;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) {
        this.quiz = <Quiz>{};
        var id = +this.activatedRoute.snapshot.params["id"];

        this.createForm();

        if (id) {
            this.editMode = true;
            var url = this.baseUrl + "api/quiz/" + id;
            this.httpClient.get<Quiz>(url).subscribe(res => {
                this.quiz = res;
                this.title = "Edit - " + this.quiz.Title;
                this.updateForm();
            }, error => console.error(error));
        } else {
            this.editMode = false;
            this.title = "Create a new Quiz";
        }
    }

    onSubmit() {
        var url = this.baseUrl + "api/quiz";

        var tempQuiz = <Quiz>{};
        tempQuiz.Title = this.form.value.Title;
        tempQuiz.Text = this.form.value.Text;
        tempQuiz.Description = this.form.value.Description;

        if (this.editMode) {

            tempQuiz.Id = this.quiz.Id;

            this.httpClient
                .post<Quiz>(url, tempQuiz)
                .subscribe(res => {
                    var q = res;
                    console.log("Quiz " + q.Id + " has been updated.");
                    this.router.navigate(["home"]);
                }, error => console.error(error));
        } else {
            this.httpClient
                .put<Quiz>(url, tempQuiz)
                .subscribe(res => {
                    var q = res;
                    console.log("Quiz " + q.Id + " has been created.");
                    this.router.navigate(["home"]);
                }, error => console.error(error));
        }
    }

    createForm() {
        this.form = this.fb.group({
            Title: ['', Validators.required],
            Description: '',
            Text: ''
        });
    }

    updateForm() {
        this.form.setValue({
            Title: this.quiz.Title,
            Description: this.quiz.Description || '',
            Text: this.quiz.Text || ''
        });
    }

    getFormControl(name: string) {
        return this.form.get(name);
    }

    isValid(name: string) {
        var e = this.getFormControl(name);
        return e && e.valid;
    }

    isChanged(name: string) {
        var e = this.getFormControl(name);
        return e && (e.dirty || e.touched);
    }

    hasError(name: string) {
        var e = this.getFormControl(name);
        return this.isChanged(name) && !this.isValid(name);
    }

    onBack() {
        this.router.navigate(["home"]);
    }
}