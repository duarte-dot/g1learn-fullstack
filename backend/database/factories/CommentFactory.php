<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $userIds = User::pluck('id');
        $postIds = Post::pluck('id');
        $randomPostId = $this->faker->randomElement($postIds);
        $randomUserId = $this->faker->randomElement($userIds);
        $randomContent = $this->faker->paragraph(3);

        return [
            'post_id' => $randomPostId,
            'user_id' => $randomUserId,
            'content' => $randomContent,
        ];
    }
}
