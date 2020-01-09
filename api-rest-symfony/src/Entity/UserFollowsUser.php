<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserFollowsUser
 *
 * @ORM\Table(name="user_follows_user", indexes={@ORM\Index(name="fk_user_2_id", columns={"user_2_id"}), @ORM\Index(name="fk_user_1_id", columns={"user_1_id"})})
 * @ORM\Entity
 */
class UserFollowsUser
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="followed_at", type="datetime", nullable=true, options={"default"="CURRENT_TIMESTAMP"})
     */
    private $followedAt = 'CURRENT_TIMESTAMP';

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="follower", referencedColumnName="id")
     * })
     */
    private $follower;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="followed", referencedColumnName="id")
     * })
     */
    private $followed;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFollowedAt(): ?\DateTimeInterface
    {
        return $this->followedAt;
    }

    public function setFollowedAt(?\DateTimeInterface $followedAt): self
    {
        $this->followedAt = $followedAt;

        return $this;
    }

    public function getFollower(): ?User
    {
        return $this->follower;
    }

    public function setFollower(?User $follower): self
    {
        $this->follower = $follower;

        return $this;
    }

    public function getFollowed(): ?User
    {
        return $this->followed;
    }

    public function setFollowed(?User $followed): self
    {
        $this->followed = $followed;

        return $this;
    }


}
