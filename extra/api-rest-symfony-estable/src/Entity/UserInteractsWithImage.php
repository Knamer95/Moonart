<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserInteractsWithImage
 *
 * @ORM\Table(name="user_interacts_with_image", indexes={@ORM\Index(name="fk_interaction_image", columns={"image_id"}), @ORM\Index(name="fk_interaction_user", columns={"user_id"})})
 * @ORM\Entity
 */
class UserInteractsWithImage
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
     * @var bool|null
     *
     * @ORM\Column(name="liked", type="boolean", nullable=true)
     */
    private $liked;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="faved", type="boolean", nullable=true)
     */
    private $faved;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="shared", type="boolean", nullable=true)
     */
    private $shared;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="liked_at", type="datetime", nullable=true)
     */
    private $likedAt = 'CURRENT_TIMESTAMP';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="faved_at", type="datetime", nullable=true)
     */
    private $favedAt = 'CURRENT_TIMESTAMP';

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="shared_at", type="datetime", nullable=true)
     */
    private $sharedAt = 'CURRENT_TIMESTAMP';


    /**
     * @var \Image
     *
     * @ORM\ManyToOne(targetEntity="Image")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="image_id", referencedColumnName="id")
     * })
     */
    private $image;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLiked(): ?bool
    {
        return $this->liked;
    }

    public function setLiked(?bool $liked): self
    {
        $this->liked = $liked;

        return $this;
    }

    public function getFaved(): ?bool
    {
        return $this->faved;
    }

    public function setFaved(?bool $faved): self
    {
        $this->faved = $faved;

        return $this;
    }

    public function getShared(): ?bool
    {
        return $this->shared;
    }

    public function setShared(?bool $shared): self
    {
        $this->shared = $shared;

        return $this;
    }

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getLikedAt(): ?\DateTimeInterface
    {
        return $this->likedAt;
    }

    public function setLikedAt(?\DateTimeInterface $likedAt): self
    {
        $this->likedAt = $likedAt;

        return $this;
    }
    
    public function getFavedAt(): ?\DateTimeInterface
    {
        return $this->favedAt;
    }

    public function setFavedAt(?\DateTimeInterface $favedAt): self
    {
        $this->favedAt = $favedAt;

        return $this;
    }

    public function getSharedAt(): ?\DateTimeInterface
    {
        return $this->sharedAt;
    }

    public function setSharedAt(?\DateTimeInterface $sharedAt): self
    {
        $this->sharedAt = $sharedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }


}
